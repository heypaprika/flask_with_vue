from flask import Flask, render_template
import os

class MyFlask(Flask):
    jinja_options = Flask.jinja_options.copy()
    jinja_options.update(dict(
        block_start_string='{%',
        block_end_string='%}',
        variable_start_string='((',
        variable_end_string='))',
        comment_start_string='{#',
        comment_end_string='#}',
    ))

ROOT_PATH = os.path.dirname(os.path.abspath(__file__))
STATIC_PATH = os.path.join(ROOT_PATH, 'dist')

app = MyFlask(__name__, static_folder=ROOT_PATH, static_url_path='')
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0



@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/vue_test')
def vue_test():
    return render_template('signin.html')

if __name__ == '__main__':
    app.run()
