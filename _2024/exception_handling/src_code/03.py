def calculate_average(numbers):
    total = sum(numbers)
    if len(numbers) == 0:
        raise ValueError("Cannot calculate average of an empty list")
    average = total / len(numbers)
    return average


numbers = []

average = calculate_average(numbers)
print(f"The average is {average}")
