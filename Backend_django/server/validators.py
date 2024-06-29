import os

from PIL import Image
from django.core.exceptions import ValidationError


def validate_icon_image_size(image):
    if image:
        with Image.open(image) as image:
            if image.width > 1925 or image.height > 1100:
                raise ValidationError(
                    f"The maximum allowed dimension for the image are 1920 x 1080 - "
                    f"size of the image you uploaded is {image.width}x{image.height}"
                )


def validate_banner_image_size(image):
    if image:
        with Image.open(image) as image:
            if image.width > 3840 or image.height > 2160:
                raise ValidationError(
                    f"The maximum allowed dimension for the image are 3840x2160 - "
                    f"size of the image you uploaded is {image.width}x{image.height}"
                )


def validate_image_file_extension(value):
    ext = os.path.splitext(value.name)[1]
    valid_extensions = [".jpg", ".jpeg", ".png", ".gif"]
    if ext not in valid_extensions:
        raise ValidationError(
            "Unsupported file extension, please choose a "
            "different extension from .jpg, .jpeg, .png, .gif"
        )


def validate_image_file_size(value):
    if value:
        if value.size > 70000:
            raise ValidationError("The maximum allowed image size is 70000")
