# backend

Buat sebuah CRUD dengan prisma, express, cors, dotenv dan nodemon
configurasi api sederhana
buat database di MySql
edit ENV untuk base_url dan port
edit gitignore untuk mengecualikan node modules

config prisma, prisma adalah ORM yang memudahkan dalam membuat database
buat nama tabel dan atributnya

config dotenv untuk port

buat api untuk
tampilkan semua data
pencarian data
hapus data
edit data (put/patch)

# versi 2 - Clean Code

Buat pembagian dari index ke controller, services, dan repository
controller untuk response dan request yang masuk
misal:
validasi inputan (tipe data, login)
validasi kesamaan dari database

Services untuk handle printah request bussiness logic
guna tanggungjawabnya ter-isolate dan functionnya re-usable
misal
Ambil semua data
Ambil data berdasarkan id
Hapus data berdasarkan id


copy semua api ke kontroler
import express router
ganti app dengan router
lalu export router

tangkap router di index js
hapus api lama
buat api baru dengan app.use(route, router)

masukkan prisma pada lib dan export
import prisma ke controler

# versi 3 - Tambahan 3 layered architecture

prisma import ke repository untuk koneksi ke database
repo hanya untuk kontrol database saja
seperti CRUD saja

kemudian untuk bagian services digunakan untuk function yang dapat di re-usable
misalnya hapus data, maka menggunakan findId() terlebih dahulu untuk memastikan id ada atau tidak
sehingga terdapat function di dalam function

controller digunakan untuk handle input saja
apakah yang masuk adalah integer?
apakah kolom sudah terisi semua?

