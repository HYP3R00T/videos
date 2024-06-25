class EmptyListError(Exception):

    def __init__(self, list_size=0):
        self.list_size = list_size
        message = f"Cannot calculate average of an empty list (size: {list_size})"
        super().__init__(message)


def calculate_average(numbers):
    total = sum(numbers)
    if len(numbers) == 0:
        raise EmptyListError(len(numbers))
    average = total / len(numbers)
    return average


numbers = []

try:
    average = calculate_average(numbers)
    print(f"The average is: {average}")
except EmptyListError as e:
    print(f"Error: {e}")
