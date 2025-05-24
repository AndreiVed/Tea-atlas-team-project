import json
import os
import django

# Налаштування Django для запуску скрипта поза веб-сервером
# Вам потрібно буде встановити правильний шлях до вашого settings.py
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "tea_atlas_service.settings")
django.setup()

from tea_catalog.models import Country, Region, Category, Tea, Descriptor


def import_tea_data(json_file_path):
    with open(json_file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # Створюємо словники для зручного пошуку значень вибору
    # Замість Fermentation.choices.values() ми використовуємо Fermentation.choices
    # і створюємо словник, де ключ - це перше значення кортежу (яке зберігається в БД)
    # а значення - це теж перше значення кортежу
    # fermentation_map = {
    #     choice[0]: choice[0] for choice in Category.Fermentation.choices
    # }
    # effect_map = {choice[0]: choice[0] for choice in Tea.Effect.choices}

    # Створюємо мапінг ключів до значень для Fermentation та Effect
    # key (з JSON) -> value (для DB)
    fermentation_key_to_value = {
        choice[0]: choice[1] for choice in Category.Fermentation.choices
    }
    effect_key_to_value = {choice[0]: choice[1] for choice in Tea.Effect.choices}

    # Значення за замовчуванням для Fermentation та Effect
    default_fermentation_value = Category.Fermentation.MINIMALLY.value
    default_effect_value = Tea.Effect.BALANCING.value

    for country_data in data:
        country_name = country_data["country"]["name"]
        country_obj, created = Country.objects.get_or_create(name=country_name)
        if created:
            print(f"Created Country: {country_obj.name}")
        else:
            print(f"Found existing Country: {country_obj.name}")

        for region_data in country_data["regions"]:
            province_name = region_data.get("province")
            region_obj, created = Region.objects.get_or_create(
                country=country_obj, province=province_name
            )
            if created:
                print(f"  Created Region: {region_obj}")
            else:
                print(f"  Found existing Region: {region_obj}")

            for category_data in region_data["categories"]:
                category_name = category_data["name"]
                fermentation_key_from_json = category_data["fermentation"]

                # Отримуємо значення ферментації для запису в БД
                fermentation_value_for_db = fermentation_key_to_value.get(
                    fermentation_key_from_json,
                    default_fermentation_value,  # Використовуємо значення за замовчуванням, якщо ключ не знайдено
                )
                if fermentation_key_from_json not in fermentation_key_to_value:
                    print(
                        f"Warning: Invalid fermentation key '{fermentation_key_from_json}' for category '{category_name}'. Using default value '{default_fermentation_value}'."
                    )

                category_obj, created = Category.objects.get_or_create(
                    name=category_name,
                    region=region_obj,
                    defaults={
                        "fermentation": fermentation_value_for_db  # Використовуємо значення для БД
                    },
                )
                if created:
                    print(
                        f"    Created Category: {category_obj.name} ({category_obj.fermentation}) in {category_obj.region}"
                    )
                else:
                    if category_obj.fermentation != fermentation_value_for_db:
                        category_obj.fermentation = fermentation_value_for_db
                        category_obj.save()
                        print(
                            f"    Updated Category: {category_obj.name} fermentation to {category_obj.fermentation} in {category_obj.region}"
                        )
                    print(
                        f"    Found existing Category: {category_obj.name} in {category_obj.region}"
                    )

                for tea_data in category_data["teas"]:
                    tea_name = tea_data["name"]
                    impact_key_from_json = tea_data.get(
                        "impact", "BALANCING"
                    )  # BALANCING - це ключ з класу, не значення

                    # Отримуємо значення впливу для запису в БД
                    impact_value_for_db = effect_key_to_value.get(
                        impact_key_from_json,
                        default_effect_value,  # Використовуємо значення за замовчуванням, якщо ключ не знайдено
                    )
                    if impact_key_from_json not in effect_key_to_value:
                        print(
                            f"Warning: Invalid impact key '{impact_key_from_json}' for tea '{tea_name}'. Using default value '{default_effect_value}'."
                        )

                    tea_obj, created = Tea.objects.get_or_create(
                        name=tea_name,
                        category=category_obj,
                        defaults={
                            "description": tea_data.get("description"),
                            "impact": impact_value_for_db,  # Використовуємо значення для БД
                        },
                    )
                    if created:
                        print(
                            f"      Created Tea: {tea_obj.name} (Category: {tea_obj.category.name})"
                        )
                    else:
                        if (
                            tea_obj.description != tea_data.get("description")
                            or tea_obj.impact != impact_value_for_db
                        ):
                            tea_obj.description = tea_data.get("description")
                            tea_obj.impact = impact_value_for_db
                            tea_obj.save()
                            print(f"      Updated existing Tea: {tea_obj.name}")
                        else:
                            print(f"      Found existing Tea: {tea_obj.name}")

                    for descriptor_name in tea_data.get("descriptors", []):
                        descriptor_obj, desc_created = Descriptor.objects.get_or_create(
                            name=descriptor_name
                        )
                        if desc_created:
                            print(f"        Created Descriptor: {descriptor_obj.name}")
                        tea_obj.descriptors.add(descriptor_obj)


if __name__ == "__main__":
    json_file_path = "tea_catalog_db_data.json"

    if os.path.exists(json_file_path):
        # Це НЕ РЕКОМЕНДУЄТЬСЯ на продакшені!
        # from django.db import connection
        # cursor = connection.cursor()
        # tables = [
        #     "tea_catalog_tea_descriptors",
        #     "tea_catalog_tea",
        #     "tea_catalog_category",
        #     "tea_catalog_region",
        #     "tea_catalog_country",
        #     "tea_catalog_descriptor"
        # ]
        # for table in tables:
        #     try:
        #         cursor.execute(f"DELETE FROM {table};")
        #         print(f"Cleared table: {table}")
        #     except Exception as e:
        #         print(f"Error clearing {table}: {e}")
        # connection.commit()
        # print("Database tables cleared (if applicable). Starting import...")

        import_tea_data(json_file_path)
        print("\nData import process completed.")
    else:
        print(f"Error: JSON file not found at {json_file_path}")
        print(
            "Please ensure 'tea_catalog_db_data.json' is in the same directory as this script, or provide the full path."
        )
