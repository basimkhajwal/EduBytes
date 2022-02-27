import spacy
import json
import subprocess
from string import punctuation

json_file_path = "videos.json"

with open(json_file_path, 'r', encoding='utf-8') as j:
    contents = json.load(j)

def extract_keywords(nlp, sequence, pos_tag):
    """
    Takes a Spacy core language model, a string sequence of text and parts of speech.
    Returns a list of keywords.
    """
    result = []

    doc = nlp(sequence.lower().replace("|", ""))

    for chunk in doc.noun_chunks:
        final_chunk = ""
        for token in chunk:
            if token.text != "ep" and (token.pos_ in pos_tag):
                final_chunk = final_chunk + token.text + " "
        if final_chunk:
            result.append(final_chunk.strip())

    for token in doc:
        if (token.text in nlp.Defaults.stop_words or token.text in punctuation.replace("-", "")):
            continue
        if token.text != "ep" and (token.pos_ in pos_tag):
            result.append(token.text)

    return result

nlp = spacy.load("en_core_web_lg")

for c in contents:
    keywords = extract_keywords(nlp, c["snippet"]["title"], ['PROPN', 'NOUN'])
    if "tags" in c["snippet"]:
        for tag in c["snippet"]["tags"]:
            keywords += extract_keywords(nlp, tag, ['PROPN'])
    c["snippet"]["tags"] = list(set(w for w in keywords if len(w)>1))

with open("../frontend/src/data/videos.json", "w") as write_file:
    json.dump(contents, write_file)