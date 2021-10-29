package br.com.streaming.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.streaming.dto.MessageDTO;
import br.com.streaming.model.Live;
import br.com.streaming.model.Message;
import br.com.streaming.repository.LiveRepository;
import br.com.streaming.service.AddMessageOnLiveService;
import br.com.streaming.service.RemoveMessagesOnLiveService;

@RestController
@RequestMapping("/live")
public class LiveController {

	@Autowired
	private LiveRepository repository;

	@Autowired
	private AddMessageOnLiveService addMessageOnLiveService;

	@Autowired
	private RemoveMessagesOnLiveService removeMessagesOnLiveService;

	@GetMapping
	public List<Live> findAll() {
		List<Live> lives = repository.findAll().stream().map(live -> {
			live.clearMessages();
			return live;
		}).collect(Collectors.toList());
		return lives;
	}

	@GetMapping("/username/{username}")
	public ResponseEntity<?> findMessagesByUsername(@PathVariable String username) {
		Optional<Live> live = repository.findByUserUsername(username);
		if (live.isPresent()) {
			return ResponseEntity.ok().body(live.get());
		} else {
			return ResponseEntity.badRequest().build();
		}
	}

	@PutMapping("/{id}/messages")
	public Message addMessage(@PathVariable Long id, @RequestBody MessageDTO messageDto) {
		Message message = addMessageOnLiveService.add(id, messageDto);
		return message;
	}

	@GetMapping("/{id}/messages")
	public List<Message> getMessagesSize(@PathVariable Long id) {
		Live live = repository.findById(id).orElse(null);
		if(live != null) {
			return live.getMessages();
		} else {
			return new ArrayList<>();
		}
	}

	@DeleteMapping("/{id}/messages")
	public ResponseEntity<?> deleteMessages(@PathVariable Long id) {
		removeMessagesOnLiveService.remove(id);
		return ResponseEntity.noContent().build();
	}

}
