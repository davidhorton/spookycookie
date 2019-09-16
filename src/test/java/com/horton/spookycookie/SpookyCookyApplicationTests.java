package com.horton.spookycookie;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SpookyCookyApplicationTests {

	static {
		System.setProperty("ETCD_SERVER", "localhost:2379");
	}

	@Test
	public void contextLoads() {
	}

}
