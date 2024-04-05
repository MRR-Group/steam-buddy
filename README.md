# Steam Buddy

![image](https://github.com/MRR-Group/steam-buddy/assets/13831258/f1d06251-a04a-44e2-9cca-f38bd99b7ead)

## Design

1. [Projekt](https://www.figma.com/file/DkGX5QuYV7KDkgSXoGyJJp/project?type=design&node-id=0-1&mode=design&t=x22JRDL5LnHpUACr-0)
2. [Makieta](https://www.figma.com/proto/DkGX5QuYV7KDkgSXoGyJJp/project?type=design&node-id=31-165&t=x22JRDL5LnHpUACr-0&scaling=scale-down&page-id=0%3A1&starting-point-node-id=31%3A165)

## Instrukcja uruchomienia projektu (środowisko developerskie)

### Kroki do uruchomienia projektu

Aby uruchomić projekt, postępuj zgodnie z poniższymi krokami:

1. Zainstaluj Docker na swoim systemie.
2. Sklonuj repozytorium git
   ```bash
   git clone https://github.com/MRR-Group/steam-buddy.git
   ```
3. Otwórz terminal i przejdź do katalogu, w którym znajduje się plik docker-compose.yml.
4. Stwórz plik .env i dostosuj jego konfigurację.
   ```bash
   cp .env.example .env
   ```
5. Jeżeli używasz Linux'a, upewnij się że zmienna `DOCKER_USER` w .env zawiera poprawne id użytkownika i jego grupy. Unikniesz dzięki temu problemów z brakiem praw edycji do plików wygenerowanych przez artisan'a lub npm. Wartość `DOCKER_USER` powinna być równa wynikowi tej komendy:

   ```bash
   echo "$(id -u):$(id -g)"
   ```

   Jeżeli korzystasz z dokera dla Windowsa z WSL, pomiń ten krok, wartości 1000:1000 są dla ciebie poprawne.

6. Przygotuj aplikacje do pracy

   ```bash
   make init
   ```

7. Uruchom projekt:
   ```bash
   make dev
   ```
8. Po zakończeniu procesu uruchamiania, projekt będzie dostępny pod adresem [http://localhost](http://localhost).

### Dostęp do konsoli PHP w kontenerze

Aby uzyskać dostęp do konsoli PHP wewnątrz kontenera, wykonaj następujące kroki:

1. Otwórz terminal.
2. Uruchom poniższą komendę:
   ```bash
   make php
   ```
3. Teraz jesteś wewnątrz kontenera PHP i możesz korzystać z narzędzi, takich jak Composer.

### Dostęp do konsoli NodeJS w kontenerze

Aby uzyskać dostęp do konsoli NodeJS wewnątrz kontenera, wykonaj następujące kroki:

1. Otwórz terminal.
2. Uruchom poniższą komendę:
   ```bash
   make node
   ```
3. Teraz jesteś wewnątrz kontenera Node i możesz korzystać z narzędzi, takich jak npm.

### Uruchomienie Code style fixer'a dla PHP i JS:

1. Otwórz terminal.
2. Uruchom poniższą komendę:
   ```bash
   make fix
   ```

### Uruchomienie Testów

1. Otwórz terminal.
2. Uruchom poniższą komendę:
   ```bash
   make test
   ```
