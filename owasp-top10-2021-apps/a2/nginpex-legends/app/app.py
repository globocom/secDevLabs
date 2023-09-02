import hashlib
from flask import Flask, render_template, request, flash, redirect
from ecdsa import SigningKey, NIST256p
from ecdsa.ecdsa import generator_256, Private_key, Public_key, Signature
from Crypto.Util.number import long_to_bytes, bytes_to_long, inverse
from zipfile import ZipFile
import io
import os
import subprocess

app = Flask(__name__, template_folder='template')

g = generator_256
ORDER = g.order()

sk = SigningKey.generate(curve=NIST256p)
vk = sk.verifying_key

# Generating patches

def sign(file, outfile):
    data = open(file, "rb").read()
    z = bytes_to_long(hashlib.sha256(data).digest())
    signature = sk.privkey.sign(z, 42)
    r = signature.r
    s = signature.s
    r_enc = long_to_bytes(r)
    s_enc = long_to_bytes(s)
    data = bytes([len(r_enc)]) + r_enc + bytes([len(s_enc)]) + s_enc + data
    open(outfile, "wb").write(data)

sign("./patches/patch1_orig.zip", "./static/patch1")
sign("./patches/patch2_orig.zip", "./static/patch2")

def getSignature(data):
    r_enc = data[1:data[0]+1]
    s_enc = data[2+data[0]:2+data[0]+data[data[0]+1]]
    zfile = data[2+data[0]+data[data[0]+1]:]
    r = bytes_to_long(r_enc)
    s = bytes_to_long(s_enc)
    return Signature(r, s), zfile

def testPatch(file):
    data = open(file, "rb").read()
    sig, zfile = getSignature(data)
    z = bytes_to_long(hashlib.sha256(zfile).digest())
    verification = vk.pubkey.verifies(z, sig)
    if verification:
        zipFile = ZipFile(io.BytesIO(zfile))
        for name in zipFile.namelist():
            eval(zipFile.read(name).decode())
        return True
    return False

@app.route("/")
def default():
    return render_template("index.html")

@app.route("/trypatch", methods=["POST", "GET"])
def ademir():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        filename = os.path.join("/uploads/", file.filename)
        file.save(filename)
        if testPatch(filename):
            return render_template("uploaded.html")
        return render_template("failed.html")
    return render_template("try.html")

@app.route("/upload")
def upload():
    return "upload"
