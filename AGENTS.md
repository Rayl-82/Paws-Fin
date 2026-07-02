# Paws&Fin — Project Context

## Tentang Project
Paws&Fin adalah marketplace pet nutrition yang mengubah 
bahan agro-maritim kurang termanfaatkan (by-product 
perikanan) menjadi snack hewan premium yang dipersonalisasi.
Project ini dibuat untuk kompetisi UTU Awards kategori 
Online Store Design.

Fitur utama: Pet Profile Personalization, Recommendation 
Engine, Subscription Box, Circular Economy storytelling.

## Tech Stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Supabase (database, belum diimplementasi — masih fokus frontend)

## Color Palette

### Base
- Background utama: #F7F9FC
- Card/component background: #FFFFFF
- Text utama: #1A1A1A

### Primary Blue (Ocean)
- Blue tint: #D6E8F5
- Blue light: #7AB3D4
- Blue utama: #1B6CA8
- Blue dark: #124E7A
- Blue deepest: #0C3350

### Accent Orange (Energy/CTA)
- Orange tint: #FDDDD5
- Orange light: #F7A08A
- Orange utama: #F26641
- Orange dark: #BF4A28

### Neutral
- Grey-blue: #F0F4F8
- Grey mid: #B0BEC5
- Grey dark: #546E7A

### Cara pakai
- Button CTA: bg #F26641, hover #BF4A28
- Navbar/brand color: #1B6CA8
- Section alternate background: #D6E8F5
- Footer: #124E7A atau #0C3350
- Subtext: #546E7A

## Typography
- Heading: Fraunces (serif)
- Body: Plus Jakarta Sans

## Design Principles
- Spacing scale konsisten (4px, 8px, 16px, 24px, 32px)
- Rounded corners untuk card (12-16px)
- Clean, premium, maritime-inspired feel
- Mobile-first responsive

## Struktur Folder
- app/ — semua pages (App Router)
- components/ — reusable components (Navbar, ProductCard, dll)
- PageInHTML/ — source HTML hasil export Figma, jadi 
  referensi untuk convert ke Next.js
- public/images/ — semua asset gambar

## Catatan Konversi
Setiap page dikonversi dari HTML hasil export Figma to Code. 
Layout dan visual harus tetap mengikuti desain asli, tapi 
spacing/margin/gap diperbaiki mengikuti design system di atas.