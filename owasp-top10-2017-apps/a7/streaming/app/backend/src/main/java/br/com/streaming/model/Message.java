package br.com.streaming.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Message {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;

	private String content;

	public Message() {}
	public Message(User user, String content) {
		this.user = user;
		this.content = content;
	}

	public Long getId() {
		return id;
	}

	public User getUser() {
		return user;
	}

	public String getContent() {
		return content;
	}

}
