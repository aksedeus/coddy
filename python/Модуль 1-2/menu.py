def load_menu():
    items = [(160, 140, 'Game', (0, 0, 0), (255, 0, 0), 0),
    # создать вторую кнопку]

    pygame.mouse.set_visible(True)

    done = False
    item = 0
    while not done:
        # закрасить фон полностью (screen и score)
        screen.fill([131, 35, 35])
        score.fill([131, 35, 35])

        for e in pygame.event.get():
                if e.type == pygame.QUIT:
                    pygame.quit()
                    sys.exit()

                if e.type == pygame.MOUSEBUTTONDOWN and e.button == 1:
                    if item == 0:
                        done = True
                    elif item == 1:
                        # отключаем pygame
                        # закрываем окно

        pointer = pygame.mouse.get_pos()
        for i in items:
            if pointer[0]>i[0] and pointer[0]<i[0]+155 and pointer[1]>i[1] and pointer[1]<i[1]+50:
                item = i[5]

        for i in items:
            if item == i[5]:
                screen.blit(myFont.render(i[2], 1, i[4]), [i[0], i[1]-40])
            else:
                screen.blit(myFont.render(i[2], 1, i[3]), [i[0], i[1]-40])

        # отобразить score и screen на window
        # обновить дисплей
