import os
import tornado


class MainHandler(tornado.web.RequestHandler):

    def get(self):
        name = self.get_argument('name', '')
        escaped_name = tornado.escape.xhtml_escape(name)
        context = {"name": escaped_name}
        self.render("public/index.html", **context)

application = tornado.web.Application([
    (r"/", MainHandler),
    (r"/images/(.*)",tornado.web.StaticFileHandler, {"path": os.path.join(os.path.dirname(__file__)) + "/images/"},),
], debug=False)

if __name__ == '__main__':
    application.listen(10001)
    tornado.ioloop.IOLoop.instance().start()