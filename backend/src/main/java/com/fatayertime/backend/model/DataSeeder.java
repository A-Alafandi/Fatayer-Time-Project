package com.fatayertime.backend.model;


import com.fatayertime.backend.repository.MenuItemRepository;
import com.fatayertime.backend.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DataSeeder {

    private final MenuItemRepository menuItemRepository;
    private final UserRepository userRepository;
    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    @PostConstruct
    public void seedDatabase() {
        seedAdmin();
        seedData();
    }

    public void seedData() {
        if (menuItemRepository.count() == 0) {
            log.info("🌱 Seeding initial menu items...");


            if (menuItemRepository.count() == 0) {
                log.info("🌱 Seeding initial menu items...");

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Syrisch Kaas")
                                .description("Traditional Syrian pie filled with creamy white cheese, parsley, and black sesame.")
                                .price(1.90)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(true)
                                .isSpicy(false)
                                .ingredients(List.of("Syrian Cheese", "Parsley", "Egg", "Black Sesame", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Manosheh Zaa'tar")
                                .description("A Levantine flatbread topped with a fragrant mix of thyme and olive oil.")
                                .price(1.90)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(true)
                                .isSpicy(false)
                                .ingredients(List.of("Za'atar (Thyme)", "Olive Oil", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Muhamara")
                                .description("Savory pie filled with spicy red pepper paste, onions, and a blend of herbs.")
                                .price(1.90)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(true)
                                .isSpicy(true)
                                .ingredients(List.of("Tomato", "Red Bell Pepper", "Onion", "Black Sesame", "Spices", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Muhamara met Kaas")
                                .description("A flavorful mix of Muhamara sauce and cheese in a baked pastry.")
                                .price(1.90)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(true)
                                .isSpicy(true)
                                .ingredients(List.of("Muhamara Sauce", "Cheese", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Zaa'tar met Kaas")
                                .description("Rich blend of za'atar, olive oil, and cheese in traditional dough.")
                                .price(1.90)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(true)
                                .isSpicy(false)
                                .ingredients(List.of("Syrian Cheese", "Za'atar (Thyme)", "Olive Oil", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Kaas")
                                .description("Classic cheese-filled pastry with a gooey mix of mozzarella and goudse kaas.")
                                .price(2.50)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(true)
                                .isSpicy(false)
                                .ingredients(List.of("Gouda Cheese", "Mozzarella", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Mini Pizza")
                                .description("Bite-sized pizzas topped with cheese and tomato sauce, perfect for snacking.")
                                .price(2.50)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(true)
                                .isSpicy(false)
                                .ingredients(List.of("Cheese", "Tomato Sauce", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Worst met Kaas")
                                .description("Delicious mix of chicken sausage and cheese, wrapped in soft dough.")
                                .price(2.50)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(false)
                                .isSpicy(true)
                                .ingredients(List.of("Chicken Sausage", "Muhamara Sauce", "Cheese", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Gekruiden Gehakt")
                                .description("Spiced minced beef pastry with a rich blend of traditional herbs.")
                                .price(2.50)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(false)
                                .isSpicy(true)
                                .ingredients(List.of("Minced Beef", "Spices", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Toshka")
                                .description("A heartier pie packed with seasoned meat and cheese, full of flavor.")
                                .price(3.00)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(false)
                                .isSpicy(true)
                                .ingredients(List.of("Minced Beef", "Cheese", "Spices", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Olijf")
                                .description("Savory pastry filled with green olives, a light muhamara sauce, and oil.")
                                .price(1.90)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(true)
                                .isSpicy(false)
                                .ingredients(List.of("Olives", "Muhamara Sauce", "Olive Oil", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Spinazie")
                                .description("A healthy mix of spinach, onion, and walnuts with a tangy syrup twist.")
                                .price(1.90)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(true)
                                .isSpicy(false)
                                .ingredients(List.of("Spinach", "Onion", "Walnuts", "Pomegranate Syrup", "Sumac", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Kip Curry met Kaas")
                                .description("Creamy chicken curry with cheese baked into a golden crust.")
                                .price(2.50)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(false)
                                .isSpicy(true)
                                .ingredients(List.of("Chicken", "Curry Spices", "Cheese", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Philadelphia")
                                .description("A luxury blend of veal, vegetables, and cheese baked to perfection.")
                                .price(4.00)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(false)
                                .isSpicy(false)
                                .ingredients(List.of("Veal", "Bell Pepper", "Corn", "Mushrooms", "Onion", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Sfeha (Gehakt - per kilo)")
                                .description("Open pie with minced meat, tomato, and pomegranate syrup, sold per kilo.")
                                .price(1.00)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(false)
                                .isSpicy(true)
                                .ingredients(List.of("Minced Meat", "Tomato", "Pomegranate Syrup", "Onion", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Mexicaanse Tonijn")
                                .description("Spicy tuna pie with vegetables, inspired by Mexican flavors.")
                                .price(4.00)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(false)
                                .isSpicy(true)
                                .ingredients(List.of("Tuna", "Paprika", "Corn", "Onion", "Mushrooms", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Mayo Cheese")
                                .description("Cheesy fatayer with a creamy garlic mayo twist and olives.")
                                .price(2.50)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(true)
                                .isSpicy(false)
                                .ingredients(List.of("Gouda Cheese", "Black Olives", "Egg", "Garlic Cream", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Steak")
                                .description("Juicy veal steak pieces wrapped in fresh dough – pure indulgence.")
                                .price(4.00)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(false)
                                .isSpicy(false)
                                .ingredients(List.of("Veal", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer 2 soorten Kaas met zwarte olijf")
                                .description("Two-cheese blend with black olives in a light pastry.")
                                .price(2.50)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(true)
                                .isSpicy(false)
                                .ingredients(List.of("Spreadable Cheese", "Gouda Cheese", "Black Olives", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Mayo Hot Dog")
                                .description("A hotdog twist on fatayer with cheese, olives, and creamy mayo.")
                                .price(2.75)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(false)
                                .isSpicy(false)
                                .ingredients(List.of("Hotdog", "Gouda Cheese", "Black Olives", "Garlic Cream", "Egg", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Feesten Hapjes (Mini Fatayer)")
                                .description("Mini-size fatayers, perfect for parties and events.")
                                .price(0.65)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(false)
                                .isSpicy(false)
                                .ingredients(List.of("Mixed Fillings", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Kip Hot Dog")
                                .description("Soft dough encasing chicken hotdog with light seasoning.")
                                .price(2.50)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(false)
                                .isSpicy(false)
                                .ingredients(List.of("Chicken Hotdog", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Pastrami Kaas")
                                .description("Delicious pastrami layered with cheese and baked inside dough.")
                                .price(2.50)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(false)
                                .isSpicy(false)
                                .ingredients(List.of("Pastrami", "Cheese", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Gedroogde Paprika")
                                .description("Oven-roasted bell pepper pie, naturally sweet and savory.")
                                .price(1.90)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(true)
                                .isSpicy(false)
                                .ingredients(List.of("Dried Paprika", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Gedroogde Paprika met Kaas")
                                .description("A combination of smoky bell peppers and melted cheese.")
                                .price(1.90)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(true)
                                .isSpicy(false)
                                .ingredients(List.of("Dried Paprika", "Cheese", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Gedroogde Paprika met Zaa'tar")
                                .description("Savory pastry of paprika and za'atar herbs – a flavorful combo.")
                                .price(1.90)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(true)
                                .isSpicy(false)
                                .ingredients(List.of("Dried Paprika", "Za'atar", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Kip Fillet")
                                .description("Juicy chicken fillet baked in fresh dough.")
                                .price(3.00)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(false)
                                .isSpicy(false)
                                .ingredients(List.of("Chicken Fillet", "Dough"))
                                .build()
                );

                menuItemRepository.save(
                        MenuItem.builder()
                                .name("Fatayer Kip Fillet met Kaas")
                                .description("Savory chicken fillet paired with cheese in a golden pastry.")
                                .price(3.50)
                                .category("Fatayer")
                                .imageUrl("https://www.shutterstock.com/image-photo/arabic-lebanese-cheese-pies-white-600nw-2538506267.jpg")
                                .isVegetarian(false)
                                .isSpicy(false)
                                .ingredients(List.of("Chicken Fillet", "Cheese", "Dough"))
                                .build()
                );
            }

            log.info("✅ Menu items seeded successfully.");
        } else {
            log.info("ℹ️ Menu already seeded. Skipping.");
        }
    }


    private void seedAdmin() {
        if (userRepository.findByUsername("admin@example.com").isEmpty()) {
            AppUser admin = new AppUser();
            admin.setId(UUID.randomUUID());
            admin.setUsername("admin@example.com");
            admin.setPassword("$2a$10$ORTVr3lFkaGqdHSWs05pVOuaeRNDcGmhhwpk8yfmft6NzAr2ujICa");
            admin.setRole("ADMIN");
            userRepository.save(admin);
            log.info("✅ Admin account seeded.");
        }
    }
}
