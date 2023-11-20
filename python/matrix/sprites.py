from pygame.sprite import Sprite


W, H = 800, 600


class Symbol(Sprite):
	def __init__(self, surf, center, group):
		super().__init__()
		self.image = surf
		self.rect = surf.get_rect(center=center)
		self.add(group)

	def update(self):
		if self.rect.y < H:
			self.rect.y += 10
		else:
			self.kill()