import sys, os
sys.path.insert(0, os.path.abspath('04_BACKEND'))
from database.database import init_db
init_db()
