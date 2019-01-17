FROM secdevlabs/kali:version1
WORKDIR /app
ADD app/forever.sh /app/forever.sh
RUN apt-get update
RUN chmod +x forever.sh
CMD ./forever.sh