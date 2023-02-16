from django import template

import hashlib

register = template.Library()

# @register.filter(name='hash')
# def hash_exam(value):
#     return str(int(hashlib.sha1(str(value).encode("utf-8")).hexdigest(), 16) % (10 ** 8))

@register.filter(name='addstr')
def addstr(arg1, arg2):
    """concatenate arg1 & arg2"""
    return str(arg1) + str(arg2)

@register.filter(name="index")
def index(sequence, position):
    return sequence[position]