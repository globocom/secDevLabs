package br.com.streaming.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class Live {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String description;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	private User user;

	@OneToMany
	@JoinColumn(name = "message_id", referencedColumnName = "id")
	private List<Message> messages;

	public Live() {}
	public Live(User user, String description) {
		this.user = user;
		this.description = description;
		this.messages = new ArrayList<>();
	}

	public User getUser() {
		return user;
	}

	public List<Message> getMessages() {
		return Collections.unmodifiableList(messages);
	}

	public Long getId() {
		return id;
	}

	public String getDescription() {
		return description;
	}

	public void clearMessages() {
		this.messages = new ArrayList<>();
	}

	public void addMessage(Message message) {
		messages.add(message);
	}

	public void removeMessages() {
		messages = new ArrayList<>();
	}

}
