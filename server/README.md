#ในการติดตั้ง ตัวฝั่งของserver นั้นต้องมี Desktop desktop ถ้าใน pc 

ใช้คำสั่ง  docker compose up -d --build 

แล้วเปิด localhost:8080 
เพื่อ login 

ีusername คือ admin 
password คือ admin1234 


add ไฟล์ 
qrcode.sql ไปจะสร้าง database 
ให้ จะสามารถใช้งาน server ในฝั่ง desktopได้แล้ว 


ถ้าติดตั้งผ่าน server ubuntu 22.04
การติดตั้งผ่าน cloud ubuntu นั้น ต้องใช้คำสั่ง ดังนี้ 

sudo apt update 

sudo apt install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


sudo apt update

sudo apt install docker-ce 

เพื่อติดตั้ง docker 

สามารถเช็ค versiondocker ได้ ด้วยคำสั่ง 

docker -v


clone project จากคำสั่ง 

git clone https://github.com/nutthapong224/interntestproject.git 

แล้ว cd interntestproject 

cd server 

แล้วก็ nano .env  

เปลี่ยน BASE_URL 

เป็น host ที่เราใช้งานเช่น 

BASE_URL=http://192.168.1.1:5000  

ใช้คำสั่ง docker compose up -d --build เพื่อนใช้งาน docker

แล้วเข้าไปที่ hostที่เราใช้งาน ยกตัวอย่างเช่น host คือ http://192.168.1.1 

เราเข้าไปยัง port 8080 เพื่อเข้าทำการแก้ไข เช่น http://192.168.1.1:8080

เข้าไปเพิ่ม database ที่ php myadmin  

รหัสคือ username = admin 
      password = admin1234

เพิ่มไฟล์ 
qrcode.sql เพื่ออสร้าง database  

ใช้ คำสั่ง docker compose down เพื่อ ผิดการทำงานของ docker 

แล้วใช้ คำสั่ง docker compose up -d เพื่อเปิดการใช้งานอีกรอบเราจะสามารถใช้ api ได้แล้ว 

