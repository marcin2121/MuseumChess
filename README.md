# MuseumChess 🏛️♟️

[English version below](#polski)

---

## 🇬🇧 English Version

> [!NOTE]  
> **Project Status: Showcase / Demo**  
> This project demonstrates technical capabilities — an interactive 3D chessboard visualization with an automated replay of a historical game.

## 📺 Demo
![MuseumChess 3D Demo EN](/demo_en.webp)

## 🌟 About the Project
MuseumChess is a conceptual website designed for chess enthusiasts. The main goal was to create an elegant, "museum-like" atmosphere that combines the historical nature of the game with modern web technologies.

## 🛠️ Current State (Homepage)
An interactive, high-aesthetic homepage has been implemented:

### 1. 3D Visualization (React Three Fiber)
*   **Procedural Staunton Pieces**: Chess pieces are generated dynamically using `LatheGeometry` (turned profiles) and composite 3D shapes, ensuring smooth performance and a unique style.
*   **Materials and Lighting**: Used `MeshPhysicalMaterial` to simulate polished ivory and dark lacquered wood (clearcoat). The scene is lit with a multi-point studio lamp system for realistic reflections.
*   **Dynamic Camera**: Automatic camera rotation around the board provides a cinematic feel.

### 2. "Game of the Century" Animation 🎬
A famous 1956 game is played live on the 3D board: **Donald Byrne vs. Robert James "Bobby" Fischer** (known as the *Game of the Century*).
*   Moves occur automatically every **2 seconds**.
*   After the checkmate sequence, the board resets and the game starts over.

### 3. Layout and Responsiveness
*   **Desktop**: Classic split between an elegant info card on the left and a full-size 3D scene on the right.
*   **Mobile**: The 3D scene acts as a full-screen background with a text overlay.
*   **i18n**: Built-in language switcher (PL/EN) integrated into the header.

---

<a name="polski"></a>

## 🇵🇱 Wersja Polska

> [!NOTE]  
> **Status projektu: Showcase / Demo**  
> Projekt prezentuje możliwości techniczne — interaktywną wizualizację 3D szachownicy z animacją historycznej partii.

## 📺 Demo
![MuseumChess 3D Demo PL](/demo_pl.webp)

## 🌟 O projekcie
MuseumChess to konceptualna strona internetowa stworzona z myślą o pasjonatach szachów. Głównym założeniem było stworzenie eleganckiego, "muzealnego" klimatu, który łączy historyczny charakter gry z nowoczesnymi technologiami webowymi.

## 🛠️ Stan obecny (Strona Główna)
W ramach prac zaimplementowano interaktywną stronę główną o wysokiej estetyce:

### 1. Wizualizacja 3D (React Three Fiber)
*   **Proceduralne Figury Staunton**: Figury szachowe generowane są dynamicznie za pomocą `LatheGeometry` (profile toczone) oraz kompozytowych brył 3D, co zapewnia płynność działania i unikalny styl.
*   **Materiały i Oświetlenie**: Wykorzystanie `MeshPhysicalMaterial` do symulacji polerowanej kości słoniowej i ciemnego drewna z lakierem (clearcoat). Scena oświetlona jest wielopunktowo (system lamp studyjnych) dla uzyskania fotorealistycznych refleksów.
*   **Dynamiczna Kamera**: Automatyczny obrót kamery wokół szachownicy nadaje scenie kinowy charakter.

### 2. Animacja "Partia Stulecia" 🎬
Na żywo na szachownicy 3D odgrywana jest słynna partia z 1956 roku: **Donald Byrne vs. Robert James "Bobby" Fischer** (znana jako *Game of the Century*).
*   Ruchy wykonują się automatycznie co **2 sekundy**.
*   Po zakończeniu sekwencji (mat) szachownica resetuje się i partia startuje od nowa.

### 3. Layout i Responsywność
*   **Desktop**: Klasyczny podział na elegancką kartę informacyjną po lewej i pełnowymiarową scenę 3D po prawej.
*   **Mobile**: Scena 3D działa jako pełnoekranowe tło, z nałożonym overlayem tekstowym.
*   **i18n**: Wbudowany przełącznik języków (PL/EN) zintegrowany z nagłówkiem.

---
*Projekt ma charakter pokazowy — demonstracja możliwości 3D w ekosystemie Next.js.*
