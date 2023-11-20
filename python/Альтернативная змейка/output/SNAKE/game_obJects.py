import pygame as pg
from random import randint


class Sprite(pg.sprite.Sprite):
	def __init__(self, image, center):
		super().__init__()
		self.image = image
		self.rect = self.image.get_rect(center = center)


class SnakeSegment(Sprite):
	def update(self, speed_xy, window_size):
		w, h = window_size
		if self.rect.right > w:
			self.rect.left = 0
		elif self.rect.left < 0:
			self.rect.right = w
		elif self.rect.top < 0:
			self.rect.bottom = h
		elif self.rect.bottom > h:
			self.rect.top = 0
		else:
			self.rect.move_ip(speed_xy)


class Apple(Sprite):
	def __init__(self, image, center, cost):
		self.cost = cost
		ratio = 1 + cost / 100
		new_size = round(image.get_width() * ratio)
		image = pg.transform.scale(image, (new_size, new_size))
		super().__init__(image, center)


	def draw(self, surface):
		surface.blit(self.image, self.rect)








