def calculate_average(numbers):
    total = sum(numbers)
    average = total / len(numbers)
    return average


numbers = []

average = calculate_average(numbers)
print(f"The average is {average}")
