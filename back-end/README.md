
## 1 Установить docker и docker-compose
https://docs.docker.com/compose/install/

## 2 Запустить контейнер с помощью команды
``` bash
    docker-compose up
```

## 3 Перейти на сайт http://localhost:18080/
```
    System: PostgresSQL
    server: db-audio
    Username: postgres
    Password: postgres
    Database: postgres
```

## 4 Слева на панели выбрать пункт меню SQL command и в появившемся окне ввести команду
``` SQL
    CREATE DATABASE "AudioStoreDB"
```

## 5 Нажать кнопку "выполнить"
Сверху над окном для ввода команды появится зеленая надпись - все отлично.

## 6 Запустить сервер

## Дополнительный шаг: запустить заполнение дефолтных значений в базу
``` bash
    npm run seeds
```
