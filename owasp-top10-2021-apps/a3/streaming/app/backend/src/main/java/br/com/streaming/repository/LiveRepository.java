package br.com.streaming.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.streaming.model.Live;

public interface LiveRepository extends JpaRepository<Live, Long>{
	Optional<Live> findByUserUsername(String username);
}
