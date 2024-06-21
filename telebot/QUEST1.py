import random
import telebot
from telebot import types

# Токен вашего бота
API_TOKEN = '6961270244:AAGk9SxmQbrS8-WrsTpMzFRyy4XFPaVzCCE'

bot = telebot.TeleBot(API_TOKEN)

# Словарь для хранения состояний пользователей
user_states = {}

# Определение сцен
scenes = {
    'start': {
        'text': "Ты просыпаешься в темном лесу. Тебя зовут Сэр МакДональдский."
                " Уже неделю путешествуешь в поисках древнего Золотого Грааля."
                " В жизни главная мечта для тебя - найти и завладеть сокровищем."
                " Ты поклялся выполнить свою миссию. Пора продолжать путь, куда пойдём?",
        'image': "images/scene1.jpg",
        'choices': {
            'Пройти через болота': 'swamp',
            'Пробиться через тропу разбойников': 'outlaw_road'
        }
    },
    'swamp': {
        'text': "Несколько часов, пробираясь через коряги, трясину - вязкую и неприятную, ты слышишь странное пение."
                " Оно невероятно прекрасно. Тебе хочется узнать источник такого волшебного звучания. Что же это?"
                " Раздвинув ветви ивы, ты обнаружил невероятно красивую женщину, которая смотрит в зеркало и напевает песню."
                " Песню столь знакомую, столь приятную, что тебе хочется подойти ещё ближе."
                " Стоп...Кажется..Ты...Что-то тащит тебя на дно...Конец игры.",
        'image': "images/scene1.jpg",
        'choices': {}
    },
    'outlaw_road': {
        'text': "Ты издалека замечаешь горящий костёр. Приблизившись, к твоему удивлению, оказывается,"
                " что это вовсе не лагерь путешественников. Вокруг разбросаны тела, повозка торговцев горит."
                " Здесь очень опасно, вероятно, здесь побывали ГОБЛИНЫ. Они не ушли далеко - прячутся в засаде. Твои действия?",
        'image': "images/scene1.jpg",
        'choices': {
            'Прокрасться, оставшись незамеченым': 'stealth_outlaw',
            'Закричать, вызывая злодеев на бой': 'battle_outlaw',
            'Обойти через долгую и заброшенную дорогу': 'walk_outlaw',
        }
    },
    'stealth_outlaw': {
        'text': "Тишайшие движения. Внимальность на максимум. Да ты буквально ассасин, который ныряет сквозь"
                " пространство, благодаря искуссному умению плута. Однако один из гоблинов заметил тебя"
                " Потому что как только твоя тяжелая броня случайно задевает ветку,"
                " в тебя летят стрелы со всех сторон...Конец игры.",
        'image': "images/scene1.jpg",
        'choices': {}
    },
    'battle_outlaw': {
        'text': "Как настоящий варвар ты взревел, вызывая разбойников, учинивших такой кошмар на бой."
                " От неожиданности один из гоблинов упал с дерева. Засада провалилась. Враги бегут,"
                " Однако один из монстров не спешит отступать! Время битвы!",
        'image': "images/scene1.jpg",
        'choices': {},
        'battle': 'goblin'
    },
    'walk_outlaw': {
        'text': "Стараясь не нарываться на неприятности, ты решил избежать встречи с разбойниками. Ты шёл"
                " ещё три дня и три ночи, заплутав в лесу окончательно. Потеряв всякую надежду на дракона тебе стало ясно,"
                " что ты и рыцарем быть не хочешь. Когда через неделю тебя нашли в лесу, ты координально изменил жизнь"
                " и стал выращивать репку в своей деревне.",
        'image': "images/scene1.jpg",
        'choices': {}
    },
}

# Словарь с противниками
enemies = {
    'goblin': {'health': 50, 'damage': 10},
    'orc': {'health': 100, 'damage': 20},
    'dragon': {'health': 200, 'damage': 50},
}

# Характеристики героя
hero = {'health': 100, 'damage': 15, 'shield': 5}

# Состояние боя
battle_state = {'enemy': None, 'enemy_action': None, 'hero_action': None}

# Обработчик команды /start
@bot.message_handler(commands=['start'])
def send_welcome(message):
    user_states[message.chat.id] = 'start'
    show_scene(message.chat.id)


# Функция для отображения сцены
def show_scene(chat_id):
    state = user_states.get(chat_id, 'start') # Состояние игрока(Сцена)
    scene = scenes[state]
    scene_photo = scene['image']

    markup = types.ReplyKeyboardMarkup(row_width=5, resize_keyboard=True)
    for choice in scene['choices'].keys():
        markup.add(types.KeyboardButton(choice))

    with open(scene_photo, "rb") as photo:
        bot.send_photo(chat_id, photo, scene['text'], reply_markup=markup)

    if 'battle' in scene:
        start_battle(chat_id, scene['battle'])

# Обработчик всех текстовых сообщений
@bot.message_handler(func=lambda message: True)
def handle_message(message):
    chat_id = message.chat.id
    state = user_states.get(chat_id, 'start')
    scene = scenes[state]

    choice = message.text
    if choice in scene['choices']:
        user_states[chat_id] = scene['choices'][choice]
        show_scene(chat_id)
    else:
        bot.send_message(chat_id, "Пожалуйста, выбери один из вариантов на клавиатуре.")

def start_battle(chat_id, enemy_name):
    battle_state['enemy'] = enemies[enemy_name].copy()
    battle_state['enemy_action'] = random.choice(['выдохся', 'разъярен'])
    battle_state['hero_action'] = None

    markup = types.InlineKeyboardMarkup()
    attack_button = types.InlineKeyboardButton("Ударить Мечем", callback_data="attack")
    defend_button = types.InlineKeyboardButton("Защищаться Щитом", callback_data="defend")
    markup.add(attack_button, defend_button)

    bot.send_message(chat_id, f"Вы сражаетесь с {enemy_name}. Противник сейчас {battle_state['enemy_action']}.", reply_markup=markup)

@bot.callback_query_handler(func=lambda call: call.data in ['attack', 'defend'])
def handle_battle_action(call):
    hero_action = call.data
    enemy = battle_state['enemy']

    result_message = ""

    if hero_action == "attack":
        if battle_state['enemy_action'] == 'выдохся':
            damage = hero['damage'] * 2
            enemy['health'] -= damage
            result_message += f"Вы атаковали противника, когда он устал. Нанесено {damage} урона!\n\n"
        else:
            damage = hero['damage']
            enemy['health'] -= damage
            result_message += f"Вы атаковали противника, когда он собрался с силами. Нанесено {damage} урона.\n\n"

        damage = enemy['damage']
        hero['health'] -= damage
        result_message += f"Противник нанес вам {damage} урона.\n\n"

    elif hero_action == "defend":
        if battle_state['enemy_action'] == 'разъярен':
            damage = max(0, (enemy['damage'] - hero['shield']) // 2)
            hero['health'] -= damage
            result_message += f"Вы защитились, когда противник собрался с силами. Получено {damage} урона.\n\n"
        else:
            damage = max(0, enemy['damage'] - hero['shield'])
            hero['health'] -= damage
            result_message += f"Вы защитились, когда противник устал. Получено {damage} урона.\n\n"

    if enemy['health'] <= 0:
        bot.send_message(call.message.chat.id, f"Вы победили противника!")
        return
    if hero['health'] <= 0:
        bot.send_message(call.message.chat.id, "Вы проиграли!")
        return

    battle_state['enemy_action'] = random.choice(['выдохся', 'разъярен'])

    markup = types.InlineKeyboardMarkup()
    attack_button = types.InlineKeyboardButton("Ударить Мечом", callback_data="attack")
    defend_button = types.InlineKeyboardButton("Защищаться Щитом", callback_data="defend")
    markup.add(attack_button, defend_button)

    result_message += f"Вы сражаетесь с противником. Противник сейчас {battle_state['enemy_action']}.\nКод события: {random.randint(1, 100000)}"

    bot.edit_message_text(chat_id=call.message.chat.id, message_id=call.message.message_id, text=result_message, reply_markup=markup)

bot.polling()