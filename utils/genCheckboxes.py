import os

tab = ['Tracer', 'Genji', 'McCree', 'Soldier 76', 'Junkrat', 'Roadhog', 'Sombra', 'Moira', 'Mercy', 'Ana', 'Lúcio', 'Torbjörn', 'Brigitte', 'Bastion', 'Pharah', 'Widowmaker', 'D.Va', 'Zenyatta', 'Doomfist', 'Mei', 'Winston', 'Hanzo']

l = sorted(tab)

file = open("output.txt", "w")


for nom in l:
    file.write('        <input type="checkbox" id="'+nom[0].lower()+nom[1:]+'" value="'+nom+'" v-model="checkedHeroes">\n        <label for="'+nom[0].lower()+nom[1:]+'">'+nom+'</label>\n')

file.write('\n\n')
for nom in l:
    file.write(", {uppercase: );
file.close()
