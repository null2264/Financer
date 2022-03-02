package io.github.null2264.financer

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import io.github.null2264.financer.LandingActivity

class LauncherActivity : AppCompatActivity() {
    private var isLoggedIn: Boolean = false

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_launcher)

        // TODO: Add actual login stuff using "Room" API
        if (!isLoggedIn) {
            val intent = Intent(this@LauncherActivity, LandingActivity::class.java)
            startActivity(intent)
        }
    }
}