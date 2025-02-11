from instagrapi import Client


insta_client = Client()
insta_client.login('theeye.network', 'iAMTHEEYE@psg#LOL')


media_url = 'https://www.instagram.com/malavikamohanan_/p/C-5IS5iMoh6/?hl=en'
media_id = insta_client.media_id(insta_client.media_pk_from_url(media_url))


amount = 10
comments = insta_client.media_comments(media_id, amount=amount)

banned_words = {"Sexy", "Beautiful","Randi","randi","boobs"}

for comment in comments:
    comment_text = comment.text
    print(f"Comment: {comment_text}")
    words = comment_text.split()
    found_banned_word = False
    for word in words:
        
        cleaned_word = word
        if cleaned_word in banned_words:
            found_banned_word = True
            break
    
    if found_banned_word:
        print("-1")  
    print('\n')
