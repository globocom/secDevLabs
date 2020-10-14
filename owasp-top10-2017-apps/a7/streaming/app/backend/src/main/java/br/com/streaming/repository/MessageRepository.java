package br.com.streaming.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.streaming.model.Message;

public interface MessageRepository extends JpaRepository<Message, Long>{
}
