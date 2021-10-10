import sys

import pandas as pd
import numpy as np

from scipy.spatial import distance


class Hobby:
    hobby_ru = ''
    hobby_en = ''
    hobby_url = ''
    image_url = ''

    def __init__(self, hobby_ru = "", hobby_en = "", hobby_url = "", image_url = ""):
        self.hobby_ru = hobby_ru
        self.hobby_en = hobby_en
        self.hobby_url = hobby_url
        self.image_url = image_url


class FindHobby:
    hobbies_dataset = []
    hobbies = []
    hobby_vectors = {}

    def __init__(self):
        hobbies_path = 'uhobby/hobbies_dataset.csv'
        # ['hobby', 'wiki_title', 'wiki_url', 'wiki_summary', 'wiki_categories', 'hobby_en', 'hobby_ru', 'hobby_vector']
        self.hobbies_dataset = pd.read_csv(hobbies_path, encoding='utf-8', index_col=0)
        self.hobbies_dataset = self.hobbies_dataset.fillna('')
        self.hobbies = list(self.hobbies_dataset['hobby'])

        for hobby, hobby_vec in self.hobbies_dataset[['hobby', 'hobby_vector']].values:
            self.hobby_vectors[hobby] = list(map(float, hobby_vec.split(',')))

    def make_hobby(self, hobby):
        hobby_data = self.hobbies_dataset[self.hobbies_dataset.hobby == hobby]
        if hobby_data.empty:
            print('no hobby', hobby)
            sys.stdout.flush()
            return Hobby()

        hobby_ru = hobby_data['hobby_ru'].values[0]
        hobby_en = hobby_data['hobby_en'].values[0]
        hobby_url = hobby_data['wiki_url'].values[0]
        image_url = hobby_data['image_url'].values[0]

        return Hobby(hobby_ru, hobby_en, hobby_url, image_url)

    def get_all_hobbies(self):
        hobbies = []
        for hobby, hobby_ru in self.hobbies_dataset[['hobby', 'hobby_ru']].values:
            data = {
                "label": hobby,
                "value": hobby_ru
            }
            hobbies.append(data)

        return hobbies

    def get_similar_hobbies(self, positive):
        if not positive:
            return []

        positive = set([x for x in positive if x in self.hobbies])

        res_hobby_vec = self.hobby_vectors[list(positive)[0]]
        if len(positive) > 1:
            res_hobby_vecs = list(zip(*[self.hobby_vectors[x] for x in positive]))
            res_hobby_vec = [np.median(x) for x in res_hobby_vecs]
            res_hobby_vec = [x / sum(res_hobby_vec) for x in res_hobby_vec]

        res_hobbies = []
        for hobby in self.hobbies:
            if hobby in positive:
                continue
            hobby_vector = self.hobby_vectors[hobby]
            dist = distance.euclidean(res_hobby_vec, hobby_vector)
            res_hobbies.append((self.make_hobby(hobby), dist))

        res_hobbies.sort(key=lambda x: x[1])

        return res_hobbies[:20]

