#Python Korea Weather Crawling 2022 Revise
#https://mustzee.tistory.com

import urllib
from bs4 import BeautifulSoup
import urllib.request as req
import ssl
import sys
#네이버 날씨 크롤링
# Phase1 Seoul Weather Crawling

def weatherInfo():
    context = ssl._create_unverified_context()
    url = 'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%82%BC%EC%84%B1%EB%9D%BC%EC%9D%B4%EC%98%A8%EC%A6%88%ED%8C%8C%ED%81%AC+%EB%82%A0%EC%94%A8'
    webpage = urllib.request.urlopen(url, context=context)
    soup = BeautifulSoup(webpage, 'html.parser')
    temps = soup.find('div','graph_inner _hourly_weather')
    result = ""
    # print(soup)
    text = temps.text.strip()

    startIndex = 0
    for i in range(8):
        weather = text[startIndex : startIndex+16]
        startIndex += 23
        result += weather
        result += "\n"
    
    print(result)

if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    weatherInfo()