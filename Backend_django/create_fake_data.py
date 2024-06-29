import os
import django
import random
from faker import Faker

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "WebChat.settings")
django.setup()

from server.models import (
    Category,
    Server,
    Channel,
)
from django.contrib.auth import get_user_model


User = get_user_model()
fake = Faker()

# Predefined data for meaningful names and descriptions
category_names = [
    "Technology",
    "Science",
    "Art",
    "Music",
    "Sports",
    "Travel",
    "Education",
    "Gaming",
    "Health",
    "Finance",
]
server_names = [
    "Tech Innovators",
    "Science Enthusiasts",
    "Art Creators",
    "Music Lovers",
    "Sports Fans",
    "Travel Gurus",
    "Edu Masters",
    "Game Zone",
    "Health Advocates",
    "Finance Experts",
]
channel_topics = [
    "General Discussion",
    "Project Updates",
    "Research News",
    "Creative Ideas",
    "Events",
    "Workshops",
    "Q&A Sessions",
    "Collaboration",
    "Health Tips",
    "Investment Strategies",
]


# Function to create test data
def create_test_data():
    # Create 10 categories
    categories = []
    for name in category_names:
        category = Category.objects.create(
            name=name,
            description=f"A category dedicated to {name.lower()} related discussions and activities.",
            icon=fake.image_url(width=300, height=200),  # Adding icon as URL
        )
        categories.append(category)

    # Create 10 random users
    users = []
    for i in range(10):
        user = User.objects.create_user(
            username=fake.user_name(), email=fake.email(), password="password123"
        )
        users.append(user)

    # Create 10 servers
    servers = []
    for i, name in enumerate(server_names):
        server = Server.objects.create(
            name=name,
            owner=random.choice(users),
            category=random.choice(categories),
            description=f"A server for {name.lower()} enthusiasts to discuss and share ideas.",
            banner=f"https://picsum.photos/300/200?random={i}",  # Adding banner as URL
            icon=f"https://picsum.photos/300/200?random={i+10}",  # Adding icon as URL
        )
        server.member.add(
            *random.sample(users, k=random.randint(1, 10))
        )  # Add random members
        servers.append(server)

    # Create 10 channels
    for i, topic in enumerate(channel_topics):
        Channel.objects.create(
            name=topic,
            owner=random.choice(users),
            topic=f"This channel focuses on {topic.lower()}.",
            server=random.choice(servers),
        )


if __name__ == "__main__":
    create_test_data()
    print("Test data created successfully!")
