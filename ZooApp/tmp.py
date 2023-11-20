from django.contrib.auth.hashers import make_password

passwords = ['user1', 'user2', 'user3', 'user4', 'user5', 'user6', 'user7', 'user8', 'user9', 'user10', 'user11', 'user12', 'user13', 'user14', 'user15', 'user16', 'user17', 'user18', 'user19', 'user20']

hashed_passwords = []
for password in passwords:
    hashed_password = make_password(password)
    hashed_passwords.append(hashed_password)

# Вывод хешированных паролей
for hashed_password in hashed_passwords:
    print(hashed_password)