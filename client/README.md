ถ้าใช้งานใน ps 
ต้องมี docker desktop ก่อน
ใช้คำสั่ง git clone https://github.com/nutthapong224/interntestproject.git  
cd client 
ใช้คำสั่งเปิด ใช้งาน docker คือ docker compose up -d --build 

จะสร้างใช้งานได้แล้ว 


ถ้าติดตั้งผ่าน ubuntu server 22.04 

ลงdocker ใน ubuntu ใช้คำสั่งดังนี้ 

sudo apt update 

sudo apt install apt-transport-https ca-certificates curl software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


sudo apt update

sudo apt install docker-ce  

สามารถเช็ค versiondocker ได้ ด้วยคำสั่ง 

docker -v

clone project จากคำสั่ง 

git clone https://github.com/nutthapong224/interntestproject.git 
 
cd client 

แก้ไขไฟล .env  ด้วยคำสั่ง nano .env 

เปลี่ยน 
VITE_API_URL
VITE_API_URL2

เป็น host ที่เราใช้งานเช่น ถ้า host เราคือ http://192.168.1.1
VITE_API_URL=http://192.168.1.1:5000/api  
VITE_API_URL2=http://192.168.1.1:5000 

แล้วก็เปิดการใช้งาน docker 
ด้วย คำสั่ง docker compose up -d --build 

จะสามารถใช้งานตัวเว็บไซต์ได้แล้ว



