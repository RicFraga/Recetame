# Este script tiene la finalidad de obtener los siguientes datos de diversos
# platillos en kiwilimon.com
# Nombre del platillo, ingredientes, pasos, calorías y link de la imagen de los platillos

import bs4
import re
import psycopg2
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup

# Pa' que cheques los datos
archivo = open("Datos", "w")
vistos = []

def guardar_datos_bd(nombre, intro ,ing, pasos, cal, carb, prot, lip, fib, az, col, link):
	# Datos para la conexión a la base de datos de postgresql
	PSQL_HOST = "localhost"
	PSQL_PORT = "5432"
	PSQL_USER = "ricf"
	PSQL_PASS = "123"
	PSQL_DB   = "proyecto_adoo"

	# Intentamos conectarnos a la bd
	try:
	    # Conectarse a la base de datos
		connstr = "host=%s port=%s user=%s password=%s dbname=%s" % (PSQL_HOST, PSQL_PORT, PSQL_USER, PSQL_PASS, PSQL_DB)
		conn = psycopg2.connect(connstr)		

		# Abrir un cursor para realizar operaciones sobre la base de datos
		cur = conn.cursor()
		
		# Realizamos la query para guardar los valores
		query = "INSERT INTO recetas(nombre, intro ,ingredientes, pasos, calorias, carbohidratos, proteinas, lipidos, fibra, azucares, colesterol, link_imagen) VALUES(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);"
		val = (nombre, intro, ing, pasos, cal, carb, prot, lip, fib, az, col, link)
		cur.execute(query, val)
		conn.commit()

		cur.close()
		conn.close()

	except(Exception, psycopg2.DatabaseError) as error:
		print(error)

# Esta función se encarga de recorrer los links de los apartados de la página que se ingresen
def recorrer_pagina(url_madre):	

    # Establecemos la conexión con la página "madre"
	print("Estableciendo conexion...\n")
	try:
		uClient = uReq(url_madre)
	except:
		print("No fue posible realizar la conexión")

    # Descargamos el html de la página "madre"
	print("Obteniendo HTML...\n")
	page_html = uClient.read()

    # Establecemos el tipo de parse html	
	page_soup = soup(page_html, "html.parser")

	# Todos los links están en links con id feed_a_receta_xxxx
	links = page_soup.find_all("a", attrs={"id": re.compile("^feed_a_receta_")})    

	# Los links a las demás recetas están "incompletos", por lo que hay que concatenárselos
	# a la siguiente base
	base = "https://www.kiwilimon.com"

	# Recorremos los links, obtenemos el complemento a los links y los construimos
	for i in range(0, len(links)):
		cadena = str(links[i])
		cadena = str(links[i])
		limite = cadena.find('"')
		cadena = cadena[limite+1:]
		limite = cadena.find('"')
		cadena = cadena[:limite]        
		link_armado = base + cadena		
		
		# Ya que hay recetas repetidas, hacemos esta validación para saber si ya vimos
		# anteriormente esta receta
		if(link_armado not in vistos):
			vistos.append(link_armado)

			# Obtenemos la info del platillo
			obtener_info_platillo(link_armado)		
	
	uClient.close()

# Esta función se encarga de establecer la conexión con la página y de obtener los
# datos que se quieren
def obtener_info_platillo(url):
	
	# Abrimos la conección con el sitio
	print("Estableciendo conexion...\n")
	try:
		uClient = uReq(url)
	except:
		print("No fue posible realizar la conexión")

	# Leemos y guardamos el código html de la página
	print("Obteniendo HTML...\n")
	page_html = uClient.read()

	# Establecemos el tipo de parse html	
	page_soup = soup(page_html, "html.parser")

	# El nombre del platillo se encuentra en el primer h1 de la página
	nombre_platillo = page_soup.h1.text	
	
	# Los ingredientes se encuentran en la etiqueta span con clase "ingrediente-nombre"
	ingredientes_containers = page_soup.find_all('span', class_ = 'ingrediente-nombre')
	ingredientes = []

	# Guardamos los ingredientes en un arreglo
	for container in ingredientes_containers:
		ingredientes.append(container.text)	

	# Los pasos se encuentran en la etiqueta div con clase "pasos"
	pasos_containers = page_soup.find_all('div', class_= 'pasos')

	# Obtenemos el texto de esta división
	pasos = pasos_containers[0].text

	# Los pasos tienen muchos saltos de línea, le damos formato a los pasos
	pasos = pasos.replace("\n", "")
	pasos = pasos.replace(".", "\n")
	pasos = pasos[1:]	

	calorias = page_soup.find_all('div', class_='div_cal')
	if(len(calorias) != 0):
		calorias = re.split("\s", calorias[0].text)		
		calorias = float(calorias[2])
	else:
		calorias = None

	carb = page_soup.find_all('div', class_='div_car')
	if(len(carb) != 0):
		carb = re.split("\s", carb[0].text)	
		carb = float(carb[2])
	else:
		carb = None

	prot = page_soup.find_all('div', class_='div_pro')
	if(len(prot) != 0):
		prot = re.split("\s", prot[0].text)	
		prot = float(prot[2])
	else:
		prot = None

	lip = page_soup.find_all('div', class_='div_lip')
	if(len(lip) != 0):
		lip = re.split("\s", lip[0].text)	
		lip = float(lip[2])
	else:
		lip = None

	fib = page_soup.find_all('div', class_='div_fib')
	if(len(fib) != 0):
		fib = re.split("\s", fib[0].text)	
		fib = float(fib[3])
	else:
		fib = None

	azu = page_soup.find_all('div', class_='div_azu')
	if(len(azu) != 0):
		azu = re.split("\s", azu[0].text)	
		azu = float(azu[2])
	else:
		azu = None

	col = page_soup.find_all('div', class_='div_col')
	if(len(col) != 0):
		col = re.split("\s", col[0].text)		
		col = float(col[2])
	else:
		col = None
			
	etiqueta_img = page_soup.find_all('img', class_='postload imagen')
	etiqueta_img = str(etiqueta_img)	

	lim_inf = etiqueta_img.find("toload")
	lim_sup = etiqueta_img.find(">")

	etiqueta_img = etiqueta_img[lim_inf:lim_sup]
	pivote = '"'
	lim_sup = etiqueta_img.find(pivote)
	etiqueta_img = etiqueta_img[lim_sup:]
	etiqueta_img = etiqueta_img.replace(pivote, "")
	etiqueta_img = etiqueta_img[:len(etiqueta_img) - 1]	
	
	info = page_soup.find_all("td", class_="diez celdaingredientes")
	info = info[0].div.text
	info = info[22:]

	# Cerramos la conexión con el sitio
	print("Cerrando conexión...")
	uClient.close()

	lista_ing = ""

	archivo.write(nombre_platillo)	
	archivo.write("\n")
	archivo.write(info)
	archivo.write("\n")
	for i in range(0, len(ingredientes)):		
		lista_ing = lista_ing + ingredientes[i]
		lista_ing = lista_ing + "\n"
	archivo.write(lista_ing)
	archivo.write(pasos)
	archivo.write("\n")
	archivo.write(str(calorias))
	archivo.write("\n")
	archivo.write(str(carb))
	archivo.write("\n")
	archivo.write(str(prot))
	archivo.write("\n")
	archivo.write(str(lip))
	archivo.write("\n")
	archivo.write(str(fib))
	archivo.write("\n")
	archivo.write(str(azu))
	archivo.write("\n")
	archivo.write(str(col))
	archivo.write("\n")
	archivo.write(etiqueta_img)
	archivo.write("\n---------------------------------------------\n")

	guardar_datos_bd(nombre_platillo, info, lista_ing, pasos, calorias, carb, prot, lip, fib, azu, col, etiqueta_img)

paginas = ("https://www.kiwilimon.com/recetas/carnes-y-aves", "https://www.kiwilimon.com/temporada/recetas-a-la-parrilla",
			"https://www.kiwilimon.com/recetas/ensaladas", "https://www.kiwilimon.com/recetas/pescados-y-mariscos", 
			"https://www.kiwilimon.com/recetas/pastas", "https://www.kiwilimon.com/recetas/comida-para-ninos", 
			"https://www.kiwilimon.com/recetas/sopas", "https://www.kiwilimon.com/recetas/guarniciones")

for i in range(0, len(paginas)):
	recorrer_pagina(paginas[i])
