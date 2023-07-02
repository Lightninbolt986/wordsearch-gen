import copy
import random

upper = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
         'W', 'X', 'Y', 'Z']
length = 10
width = 10


def gen(l, w, words):
    # Empty
    mainWS = []
    for i in range(l):
        e = []
        for j in range(w):
            e.append(random.choice(upper))
        mainWS.append(e)

    # Fill words
    mainWScopy = copy.deepcopy(mainWS)

    def putWords(mainWS, words):
        for word in words:
            if random.randint(0, 1) == 0:
                word = word[::-1]
            word = word.upper()
            vert = True
            hori = True
            if len(word) > l:
                vert = False
            if len(word) > w:
                hori = False
            if not (hori or vert):
                raise Exception("Stoopid idot")
            rows = l - (len(word))
            columns = w - (len(word))
            if not (hori and vert):
                if hori:
                    direction = 0
                else:
                    direction = 1

            else:
                direction = random.choice([0, 1, 2])
            # 0 - Horizontal
            # 1 - Vertical
            # 2 - Diagonal
            if direction == 0:
                count = 0

                def fillWord(wor, r, c, ws, count):
                    if count >= 25:
                        mainWS = copy.deepcopy(mainWScopy)
                        print('restarting')
                        show(mainWS)
                        print('restarting')
                        return putWords(mainWS, words)
                    row = random.randint(0, l - 1)
                    column = random.randint(0, c)
                    print(row, column)
                    go = checkWord(wor, direction, row, column, ws)
                    if go:
                        for i in range(len(wor)):
                            ws[row][column + i] = wor[i]
                            used.append((row, column + i))
                    else:
                        count += 1
                        fillWord(wor, r, c, ws, count)

                fillWord(word, rows, columns, mainWS, count)

                show(mainWS)
            elif direction == 1:
                count = 0

                def fillWord(wor, r, c, ws, count):
                    if count >= 25:
                        mainWS = copy.deepcopy(mainWScopy)
                        print('restarting')
                        show(mainWS)
                        print('restarting')
                        return putWords(mainWS, words)
                    row = random.randint(0, r)
                    column = random.randint(0, w - 1)
                    go = checkWord(wor, direction, row, column, ws)
                    if go:
                        for i in range(len(wor)):
                            ws[row + i][column] = word[i]
                            used.append((row + i, column))
                    else:
                        count += 1
                        fillWord(wor, r, c, ws, count)

                fillWord(word, rows, columns, mainWS, count)
                show(mainWS)
            elif direction == 2:
                count = 0

                def fillWord(wor, r, c, ws, count):
                    if count >= 25:
                        mainWS = copy.deepcopy(mainWScopy)
                        print('restarting')
                        show(mainWS)
                        print('restarting')
                        return putWords(mainWS, words)
                    row = random.randint(0, r)
                    column = random.randint(0, c)
                    go = checkWord(wor, direction, row, column, ws)
                    if go:
                        for i in range(len(wor)):
                            ws[row + i][column + i] = word[i]
                            used.append((row + i, column + i))
                    else:
                        count += 1
                        fillWord(wor, r, c, ws, count)

                fillWord(word, rows, columns, mainWS, count)
                show(mainWS)

    putWords(mainWS, words)
    return mainWS


def show(t):
    print('\n')
    for i in t:
        print(' '.join(i))


used = []


def checkFine(letter, r, c, ws):
    return letter == ws[r][c] or (r, c) not in used


def checkWord(word, direction, start_r, start_c, ws):
    if direction == 0:
        for i in range(len(word)):
            if not checkFine(word[i], start_r, start_c + i, ws):
                return False
        return True
    elif direction == 1:
        for i in range(len(word)):
            if not checkFine(word[i], start_r + i, start_c, ws):
                return False
        return True
    elif direction == 2:
        for i in range(len(word)):
            if not checkFine(word[i], start_r + i, start_c + i, ws):
                return False
        return True


show(gen(10, 10, ['Hydrogen',
                  'Helium',
                  'Lithium',
                  'Beryllium',
                  'Boron',
                  'Carbon',
                  'Nitrogen',
                  'Oxygen',
                  'Fluorine',
                  'Neon']))
