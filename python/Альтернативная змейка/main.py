import pygame as pg 
import colors
from game_obJects import SnakeSegment, Apple
from random import randint, choice

class Game:
	def __init__(self, main_surface, font):
		self.ms = main_surface
		self.score = 0
		self.game_over = False
		self.font = font
 
		self.size = self.ms.get_size()
		self.w, self.h, = self.size

		sprite_size = (self.w // 20, self.w // 20)

		self.head_image = self.load_image('images/head.png',sprite_size)
		self.body_image = self.load_image('images/body.png',sprite_size)
		self.apple_image = self.load_image('images/apple.png',sprite_size)
		self.bg = self.load_image('images/ground.jpg', self.size)

		self.speed = 5
		self.step = self.head_image.get_width()
		self.direction = (self.step, 0)

		self.snake = pg.sprite.Group()
		self.snake.add(SnakeSegment(self.head_image, (self.w // 2, self.h // 2)))
		self.apple = self.new_apple()

		self.apple_sound = pg.mixer.Sound('songs/apple.wav')
		self.apple_sound.set_volume(5)
		self.end_sound = pg.mixer.Sound('songs/end.wav')
		pg.mixer.music.set_volume(0.5)
		pg.mixer.music.play(-1)



	def process_events(self):
		for event in pg.event.get():
			if event.type == pg.QUIT:
				return False
			if event.type == pg.MOUSEBUTTONDOWN:
				if self.game_over:
					self.__init__(self.ms, self.font)
					break
		return True


	def run_logic(self):
		if self.game_over:
			return

		snake = self.snake.sprites()
		for segment in snake[2:]:
			if snake[0].rect.colliderect(segment.rect):
				self.game_over = True
				pg.mixer.music.stop()
				self.end_sound.play()
				break

		self.pickup_apple()
		self.move_snake()
	    
	def pickup_apple(self):
		snake = self.snake.sprites()
		if snake[0].rect.colliderect(self.apple.rect):
			self.score += self.apple.cost                  
			self.apple = self.new_apple()
			self.apple_sound.play()
			self.snake.add(SnakeSegment(self.body_image, snake[-1].rect.center))

	def move_snake(self):	
		keys = pg.key.get_pressed()
		snake = self.snake.sprites()

		new_direction = self.direction

		if keys[pg.K_UP] and self.direction[1] == 0:
			new_direction = (0, -self.step)
		elif keys[pg.K_DOWN] and self.direction[1] == 0:
			new_direction = (0, self.step)
		elif keys[pg.K_LEFT] and self.direction[0] == 0:
			new_direction = (-self.step, 0)
		elif keys[pg.K_RIGHT] and self.direction[0] == 0:
			new_direction = (self.step, 0)

		#обновляем тело
		for i in range(len(snake) -1, 0, -1):
			snake[i].rect.center = snake[i - 1].rect.center

		#обновляем голову
		self.direction = new_direction
		snake[0].update(speed_xy=self.direction, window_size=self.size)



	def draw(self):
		if self.game_over:
			self.draw_game_over()
		else:
			self.draw_game()

	def new_apple(self):
		cost = choice([5, 10, 20])
		apple = Apple(self.apple_image, (20, 20), 5)

		x = randint(apple.rect.w // 2,self.w - apple.rect.w // 2)
		y = randint(apple.rect.h // 2,self.h - apple.rect.h // 2)
		apple.rect.center = (x, y)
		return apple

	def draw_game(self):
		self.ms.blit(self.bg, (0, 0))
		self.snake.draw(self.ms)
		self.apple.draw(self.ms)

		score_txt = self.font.render(str(self.score), True, colors.ORANGE)
		self.ms.blit(score_txt, (self.w // 2, 10))

	def draw_game_over(self):
		self.ms.fill(colors.BLACK)
		score_str = f'вы набрали {self.score} очков.'
		return_str = 'Если хотите начать заново нажмите ЛКМ.'

		score_txt = self.font.render(score_str, True, colors.GREEN)	
		rerun_txt = self.font.render(return_str, True, colors.GREEN)

		score_x = (self.w - score_txt.get_width()) // 2
		return_x = (self.w - rerun_txt.get_width()) // 2

		self.ms.blit(score_txt, (score_x, self.h // 4))
		self.ms.blit(rerun_txt, (return_x, self.h // 2))

	def load_image(self,path, size):
		image = pg.image.load(path).convert_alpha()
		image = pg.transform.scale(image, size)
		return image




def main():
	pg.init()
	pg.display.set_caption('Snake')
	screen = pg.display.set_mode((800, 600))
	pg.mixer.music.load('songs/lol.mp3')

	clock = pg.time.Clock()
	font = pg.font.Font(None, 35)

	game = Game(screen, font)

	while True:
		play = game.process_events()
		if not play:
			break

		game.run_logic()
		game.draw()

		pg.display.update()
		clock.tick(game.speed)


if __name__ == '__main__':
	main()
	
