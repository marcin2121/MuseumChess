# MuseumChess 🏛️♟️

> [!NOTE]  
> **Status projektu: Showcase / Demo**  
> Projekt prezentuje możliwości techniczne — interaktywną wizualizację 3D szachownicy z animacją historycznej partii.

## 🌟 O projekcie
MuseumChess to konceptualna strona internetowa stworzona z myślą o pasjonatach szachów. Głównym założeniem było stworzenie eleganckiego, "muzealnego" klimatu, który łączy historyczny charakter gry z nowoczesnymi technologiami webowymi.

## 🛠️ Stan obecny (Strona Główna)
W ramach prac zaimplementowano interaktywną stronę główną o wysokiej estetyce:

### 1. Wizualizacja 3D (React Three Fiber)
*   **Proceduralne Figury Staunton**: Figury szachowe generowane są dynamicznie za pomocą `LatheGeometry` (profile toczone) oraz `ExtrudeGeometry` (wyrzeźbiona głowa skoczka), co zapewnia płynność działania i unikalny styl.
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
