from django.conf import settings
from random import choice
from string import ascii_letters, digits

SIZE = getattr(settings, "MAXIMUM_URL_CHAR", 7)

AVAILABLE_CHARS = ascii_letters + digits


def create_random_code(char=AVAILABLE_CHARS):
    """
    Creates a random string with the predetermined size
    """
    
    return "".join(
        [choice(char) for _ in range(SIZE)]
    )
    

def create_shortener_link(model_instance):
    randomCode = create_random_code()
    # Gets the model class
    
    
    model_class = model_instance.__class__
    
    if model_class.objects.filter(short_url = randomCode).exists():
        # Run the function again
        return create_shortener_link(model_instance)
    
    return randomCode