# Пример кода с ошибкой
def calculate_average(numbers):
    if not numbers:  # Проверяем, не пустой ли список
        return 0
    total = sum(numbers)
    average = total / len(numbers)
    return average

def main():
    # Тестируем с пустым списком
    data = []
    result = calculate_average(data)
    print(f"Среднее значение пустого списка: {result}")
    
    # Тестируем с данными
    data_with_numbers = [1, 2, 3, 4, 5]
    result = calculate_average(data_with_numbers)
    print(f"Среднее значение [1,2,3,4,5]: {result}")

if __name__ == "__main__":
    main()