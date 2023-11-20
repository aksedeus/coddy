# coding: utf8
import pygame, time, random

pygame.init()

def snake(block_size, snakeList, snakeHead, lead_x, lead_y):
    for XnY in snakeList:
        pygame.draw.rect(gameDisplay, red, [XnY[0],XnY[1],block_size,block_size])
        pygame.draw.rect(gameDisplay, red, [lead_x,lead_y,block_size,block_size])

def message_to_screen(msg,color,x,y):
    screen_text = font.render(msg, True, color)
    gameDisplay.blit(screen_text, [x,y])

# задаем цвета заранее
white = (255,255,255)
black = (0,0,0)
red = (255,0,0)
green = (0,255,0)

# задаем размеры окна и блоков змейки
display_width = 400
display_height = 400
block_size = 25

# создаем окно
gameDisplay = pygame.display.set_mode((400,400))
pygame.display.set_caption("Snake")

font = pygame.font.SysFont(None, 25)
	
gameExit = False

# координаты головы змейки
lead_x = display_width/2
lead_y = display_height/2
# переменные, отвечающие за направление движения змейки
lead_x_change = 0
lead_y_change = 0

snakeList = []
snakeLength = 1
score = 0

# случайные координаты яблока
appleX = round(random.randrange(0, display_width)/block_size)*block_size
appleY = round(random.randrange(0, display_height)/block_size)*block_size

while not gameExit:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            gameExit = True
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_LEFT:
                lead_x_change = -block_size
                lead_y_change = 0
            elif event.key == pygame.K_RIGHT:
                # ваш код здесь - движение вправо
            elif event.key == pygame.K_DOWN:
                # ваш код здесь - движение вниз
            elif event.key == pygame.K_UP:
                # ваш код здесь - движение вверх

    gameDisplay.fill(white)

    # столкновение со стеной
    if lead_x >= display_width-block_size or lead_x <0 or lead_y >= display_height-block_size or lead_y <0:
        gameDisplay.fill(white)
        message_to_screen(''.join(["Game over! Score: ",str(score)]), black, 100,200)
        pygame.display.update()
        time.sleep(2)
        gameExit = True

    # движение змейки    
    lead_x += lead_x_change
    lead_y += lead_y_change
    snakeHead = [lead_x, lead_y]
    snakeList.append(snakeHead)
    if len(snakeList) > snakeLength:
        del snakeList[0]

    # столкновение змейки с самой собой
    for eachSegment in snakeList[:-1]:
        if eachSegment == snakeHead:
            gameDisplay.fill(white)
            message_to_screen(''.join(["Game over! Score: ",str(score)]), black, 100,200)
            pygame.display.update()
            # ваш код здесь - ожидание 2 секунды и выход из игры

    # столкновение с яблоком
    if lead_x == appleX and lead_y == appleY:
        appleX = round(random.randrange(0, display_width)/block_size)*block_size
        appleY = round(random.randrange(0, display_height)/block_size)*block_size
        # ваш код здесь - увеличить длину змейки и количество баллов

    # отображение количества очков
    message_to_screen(''.join(["Score: ",str(score)]), black, 10,10)
    # отображение яблока
    pygame.draw.rect(gameDisplay, green, [appleX, appleY, block_size, block_size])
    # отображение змейки
    snake(block_size, snakeList, snakeHead, lead_x, lead_y)

    pygame.display.update()
    pygame.time.delay(150)

pygame.quit()