# Ma'ruza mashg'uloti: nomdor stipendiyalar, tanlovlar va fan olimpiadalari

Abu Rayhon Beruniy nomidagi Urganch davlat universiteti · Axborot xavfsizligi yo'nalishi
Kredit haftaligi 3-kun · 2 akademik soat (80 daqiqa)

## Ishga tushirish

`index.html` faylini brauzerda ochish kifoya. Server yoki internet talab qilinmaydi
(shriftlar internetsiz tizim shriftlariga tushadi).

## Boshqarish

| Tugma | Vazifa |
|---|---|
| `→` / `Space` / `PageDown` | keyingi slayd |
| `←` / `PageUp` | oldingi slayd |
| `1`–`9` | tanlangan slaydga o'tish |
| `Home` / `End` | birinchi / oxirgi slayd |
| `O` | mashg'ulot rejasi paneli |
| `F` | to'liq ekran |
| `Esc` | panelni yopish |

Yuqori panelda: mashg'ulot taymeri (80 daqiqa, bosilganda boshlanadi va to'xtaydi),
yorug'/qorong'i rejim, reja paneli.

## Tuzilishi (14 slayd)

1. Mavzuga kirish
2. Maqsad, kutilayotgan natijalar va mashg'ulot bosqichlari
3. Planshet asosidagi kirish savollari — kartani bosib javob ochiladi
4. Nomdor stipendiyalar tizimi: ikki guruh
5. 11 ta stipendiya — izlash va qamrov bo'yicha filtr
6. Da'vogarlik yo'li + **tayyorlik kalkulyatori**
7. Tanlovlar
8. Fan olimpiadalari: maqsad va bosqichlar
9. Axborot xavfsizligi yo'nalishi: formatlar va tayyorgarlik
10. Sakkiz haftalik tayyorgarlik rejasi
11. Interaktiv bilim sinovi (7 savol, ball hisobi)
12. Amaliy topshiriq va mustaqil ish
13. Baholash mezonlari va fidbek
14. Xulosa va manbalar

### Tayyorlik kalkulyatori (6-slayd)

Talaba kursini, o'zlashtirish ko'rsatkichini, ilmiy nashr, tanlov va tadbir
faolligini kiritadi; sahifa tayyorlik foizini, hozirgi bosqichdagi qamrovni va
yetishmayotgan mezonlarni ko'rsatadi.

Ball og'irliklari: o'zlashtirish 40, ilmiy nashr 25, tanlov va olimpiada 20,
ma'naviy-ma'rifiy faollik 15. Faqat yuqori baho 40% beradi — bu qo'llanmadagi
talabni aks ettiradi: o'zlashtirish yolg'iz yetarli emas. Natija shartli
o'z-o'zini baholash, rasmiy saralash OTT nizomi asosida o'tkaziladi.

## Mazmun manbasi

Asosiy mazmun — metodik qo'llanmaning **38–40-betlari** (kredit haftaligi 3-kun):
nomdor stipendiyalar ro'yxati va qamrov shartlari, da'vogarlik tartibi, tanlovlar,
fan olimpiadalarining maqsadi, bosqichlari va fan yo'nalishlari.

Mashg'ulot uchun qo'shilgan qism: mashg'ulot bosqichlari, tayyorlik kalkulyatori,
sakkiz haftalik tayyorgarlik rejasi, bilim sinovi savollari, amaliy topshiriq va
baholash rubrikasi.

## Fayllar

```
maruza-web/
├── index.html      slaydlar mazmuni
├── css/style.css   dizayn tizimi, yorug'/qorong'i rejim, moslashuvchanlik
├── js/app.js       navigatsiya, taymer, filtr, test, ma'lumotlar
└── README.md
```

Mazmunni tahrirlash: matn `index.html` da, ro'yxatlar (stipendiyalar, haftalik reja,
test savollari, mashg'ulot bosqichlari) `js/app.js` faylining boshidagi `MA'LUMOTLAR`
bo'limida joylashgan. Ranglar `css/style.css` faylining boshidagi tokenlar orqali
o'zgartiriladi.

## Chop etish

`Ctrl + P` — barcha slaydlar ketma-ket, har biri alohida sahifada chiqadi
(tarqatma material sifatida).
