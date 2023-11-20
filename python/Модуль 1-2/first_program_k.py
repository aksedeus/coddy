# coding: utf8
import pygame

# размер окна
size = [400, 400]
window = pygame.display.set_mode(size)

# задайте имя
pygame.display.set_caption("First file")

screen = pygame.Surface(size)

# создание объекта
square = pygame.Surface([40, 40])
square.fill([0, 0, 0])
#right_free = True
x = 0

running = True
while running:
    # обработка событий
    for e in pygame.event.get():
        if e.type == pygame.QUIT:
            running  = False

    # задайте фоновый цвет
    screen.fill([34, 182, 111])

    # движение квадрата
    '''if right_free == True:
        x += 1
        if x > 360:
            right_free = False
    else:
        x -= 1
        if x < 0:
            right_free = True'''

    # отображение квадрата
    screen.blit(square, [x, 0])


    # отображение окна
    window.blit(screen, [0, 0])
    pygame.display.flip()
    pygame.time.delay(5)


pygame.quit()
