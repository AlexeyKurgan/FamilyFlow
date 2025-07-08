THIS SHOULD BE A LINTER ERROR# Пример кода с ошибкой
def calculate_average(numbers):
    if not numbers:  # Проверяем, не пустой ли список
        return 0
    total = sum(numbers)
    average = total / len(numbers)
    return average

def main():
    data = []  # Пустой список - тут будет ошибка!
    result = calculate_average(data)
    print(f"Среднее значение: {result}")

if __name__ == "__main__":
    main()