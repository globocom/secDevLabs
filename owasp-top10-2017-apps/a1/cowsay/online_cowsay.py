import re
from flask import Flask, render_template, request
from jinja2 import evalcontextfilter
from markupsafe import Markup, escape
import os

app = Flask(__name__)
_paragraph_re = re.compile(r'(?:\r\n|\r|\n){2,}')


@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        phrase = request.form['phrase']
    else:
        phrase = "write what you want me to say in the box"

    return render_template('base.html',
                           phrase=phrase,
                           formatted_phrase=cowsay(phrase))


def cowsay(phrase):
    response = os.popen("/usr/games/cowsay " + phrase).read()
    return response


@app.template_filter()
@evalcontextfilter
def nl2br(eval_ctx, value):
    result = u'\n\n'.join(u'<p>%s</p>' % p.replace('\n', Markup('<br>\n'))
                          for p in _paragraph_re.split(escape(value)))
    if eval_ctx.autoescape:
        result = Markup(result)
    return result


if __name__ == '__main__':
    app.run(host='0.0.0.0')
