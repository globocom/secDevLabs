package br.com.streaming.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.com.streaming.model.Live;
import br.com.streaming.repository.LiveRepository;

@Service
public class RemoveMessagesOnLiveService {
	
	@Autowired
	private LiveRepository liveRepository;

	public void remove(Long id) {
		Live live = liveRepository.findById(id).orElse(null);
		live.removeMessages();
		liveRepository.save(live);
	}
}
