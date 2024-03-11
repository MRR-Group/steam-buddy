## Instrukcja uruchomienia projektu (środowisko developerskie)

### Kroki do uruchomienia projektu
Aby uruchomić projekt, postępuj zgodnie z poniższymi krokami:

1. Zainstaluj Docker na swoim systemie.
2. Sklonuj repozytorium git
    ```bash
    git clone https://github.com/AmonDeShir/CN-Project
    ```
3. Otwórz terminal i przejdź do katalogu, w którym znajduje się plik docker-compose.yml.
4. Zbuduj obrazy Dockera
    ```bash
    docker compose build --no-cache --pull   
    ```
5. Stwórz plik .env i dostosuj jego konfigurację.
    ```bash
    cp .env.example .env
    ```
6. Jeżeli używasz Linux'a, upewnij się że zmienna `DOCKER_USER` w .env zawiera poprawne id użytkownika i jego grupy. Unikniesz dzięki temu problemów z brakiem praw edycji do plików wygenerowanych przez artisan'a lub npm. Wartość `DOCKER_USER` powinna być równa wynikowi tej komendy:
    ```bash
    echo "$(id -u):$(id -g)"
    ```
    Jeżeli korzystasz z dokera dla Windowsa z WSL, pomiń ten krok, wartości 1000:1000 są dla ciebie poprawne.

7. Uruchom projekt przy użyciu komendy:
    ```bash
    docker compose up -d
    ```
8. Po zakończeniu procesu uruchamiania, projekt będzie dostępny pod adresem [http://localhost](http://localhost).

### Dostęp do konsoli PHP w kontenerze
Aby uzyskać dostęp do konsoli PHP wewnątrz kontenera, wykonaj następujące kroki:

1. Otwórz terminal.
2. Uruchom poniższą komendę:
    ```bash
    docker compose exec -it php bash
    ```
3. Teraz jesteś wewnątrz kontenera PHP i możesz korzystać z narzędzi, takich jak Composer.

### Dostęp do konsoli NodeJS w kontenerze
Aby uzyskać dostęp do konsoli NodeJS wewnątrz kontenera, wykonaj następujące kroki:

1. Otwórz terminal.
2. Uruchom poniższą komendę:
    ```bash
    docker compose exec -it node bash
    ```
3. Teraz jesteś wewnątrz kontenera Node i możesz korzystać z narzędzi, takich jak npm.

### Uruchomienie serwera Vite
Aby uruchomić serwer Vite, wykonaj następujące kroki:

1. Otwórz terminal.
2. Uruchom poniższe komendy:
    ```bash
    docker compose exec -it node bash
    npm run dev
    ```
3. Po zakończeniu procesu uruchamiania, serwer będzie dostępny pod adresem [http://localhost:5173/](http://localhost:5173/).

### Uruchomienie Code style fixer'a dla PHP:
1. Otwórz terminal.
2. Uruchom poniższe komendy:
    ```bash
    docker compose exec -it php composer cs
    ```
3. W konsoli zobaczysz teraz wszystkie fragmenty kodu, które według CS Fixer'a można napisać lepiej. Możesz użyć komendy `csf` zamiast `cs` aby zastosować zaproponowane poprawki.

## Opis pliku docker-compose.yml
Plik docker-compose składa się z pięciu usług (web, php, database, redis, node), oraz z konfiguracji woluminów przechowujących dane bazy i Redis oraz jednej wspólnej sieci dla całego środowiska.

## Opis poszczególnych usług
### PHP (php)
Ta usługa korzysta z własnego obrazu opartego na obrazie `php:8.2-fpm-alpine3.16` i jest odpowiedzialna za serwer PHP oraz instalację Composera. Pliki projektu są montowane do wewnętrznego katalogu `/app` kontenera. Obraz podczas startu uruchamia plik `./docker/php/entrypoint.sh`, który jest odpowiedzialny za instalację Predis oraz uruchomienie serwera PHP. Usługa czeka z uruchomieniem na bazę danych i serwer Redis.

### Nginx (web)
Usługa web korzysta z obrazu `nginx:1.25.3-alpine` i obsługuje serwer WWW. Port 80 jest mapowany na port 80 w kontenerze, a pliki konfiguracyjne Nginx są montowane z `/docker/nginx/config.conf`.

### Postgres (database)
Usługa database używa obrazu `postgres:16.1-alpine3.19` i jest używana jako baza danych projektu. Konfiguracja bazy danych jest wczytywana ze zmiennych środowiskowych (plik .env). Dodatkowo baza danych zapisuje swoje dane na osobnych woluminie `db_data`. Usługa posiada również healthcheck pozwalający sprawdzić, czy baza danych jest już gotowa do pracy.

### System kolejek Redis (redis)
Ta usługa wykorzystuje obraz `redis:7.2.3-alpine` i jest odpowiedzialna za przygotowanie systemu kolejek. Konfiguracja Redis jest wczytywana ze zmiennych środowiskowych. Dane Redis są przechowywane na woluminie `redis_data`. Dostępny jest również healthcheck pozwalający sprawdzić, czy Redis jest już gotowy do pracy.

### NodeJS (node)
Ta usługa korzysta z własnego obrazu opartego na obrazie `node:20-alpine` i jest odpowiedzialna za przygotowanie środowiska Node.js do pracy nad frontendem. Pliki projektu są montowane do wewnętrznego katalogu `/app` kontenera. Obraz podczas startu uruchamia plik `./docker/node/entrypoint.sh`, który jest odpowiedzialny za instalację wszystkich potrzebnych bibliotek JS (między innymi Vite) oraz uruchomienie domyślnego entrypoint'a obrazu `node:20-alpine`.
