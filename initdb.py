from pymongo import MongoClient

# 连接 MongoDB
client = MongoClient("mongodb://localhost:27017/")

# 选择数据库
db = client["DB"]

# 初始化集合和数据
collections_data = {
    "d_nav": [
        {
            "group_name": "测试3",
            "style": "哥特风",
            "style_des": "书籍资源2",
            "tab_list": [],
            "group_name_url": ""
        }
    ],
    "d_site_config": [
        {"type":"seo","config":{"is_show":True,"list":[{"icon_class":"fab","icon_size":20,"icon_color":"#001b140","icon_hover_color":"#00811733","text":"风","img":"不要","url":""},{"icon_class":"fabane","icon_size":20,"icon_color":"#0088cc","icon_hover_color":"#085b85","text":"关注老胡TG","img":"","url":"https://t.me/howie_weekly111"}]}}
    ],
    "d_surprise": [
        {
            "title": "格力空调大促销",
            "allowed_close": 0,
            "is_show": 1,
            "type": 3,
            "img_url": "https://img2.baidu.com/it/u=2689236790,3198016783&fm=253&fmt=auto&app=138&f=JPEG?w=900&h=500",
            "description": "悠悠两周年，不灭传奇情",
            "position": 2,
            "url": "https://baike.baidu.com/item/%E4%BC%A0%E5%A5%87/9055?fr=ge_ala",
            "start_ts": 1723564800,
            "end_ts": 1725033599
        }
    ],
    "d_friendship_links": []  # 预留集合
}

# 创建集合并插入数据
for collection_name, documents in collections_data.items():
    if collection_name not in db.list_collection_names():
        db.create_collection(collection_name)
    
    if documents:
        db[collection_name].insert_many(documents)

print("MongoDB 数据库初始化完成！")
