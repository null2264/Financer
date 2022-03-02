package io.github.null2264.financer

import android.content.Context
import android.os.Bundle
import android.text.Spannable
import android.text.SpannableString
import android.text.style.ForegroundColorSpan
import android.util.TypedValue
import android.widget.TextView
import androidx.annotation.AttrRes
import androidx.annotation.ColorInt
import androidx.appcompat.app.AppCompatActivity

@ColorInt
fun Context.getColorFromAttr(
    @AttrRes attrColor: Int,
    typedValue: TypedValue = TypedValue(),
    resolveRefs: Boolean = true
): Int {
    theme.resolveAttribute(attrColor, typedValue, resolveRefs)
    return typedValue.data
}

class LandingActivity : AppCompatActivity() {

    private lateinit var greetingText: TextView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_landing)

        greetingText = findViewById(R.id.greeting)

        val appName = SpannableString(getString(R.string.app_name).uppercase())
        appName.setSpan(
            ForegroundColorSpan(getColorFromAttr(R.attr.colorPrimary)),
            0,
            appName.length,
            Spannable.SPAN_EXCLUSIVE_EXCLUSIVE
        )

        greetingText.apply {
            append("Welcome to ")
            append(appName)
            append("!")
        }
    }

    override fun onBackPressed() {
        finishAffinity()
    }
}